
import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

const NotificationsView = ({
  companies = [],
  overriddenCommunications = [],
  setOverriddenCommunications,
}) => {
  const getNotifications = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdueComms = [];
    const todayComms = [];

    companies.forEach((company) => {
      const nextComm = company.communications?.[0];
      if (nextComm) {
        const nextCommDate = new Date(nextComm.date);
        nextCommDate.setHours(0, 0, 0, 0);

        if (nextCommDate < today) {
          overdueComms.push({
            company,
            daysOverdue: Math.floor((today - nextCommDate) / (1000 * 60 * 60 * 24)),
            commDate: nextComm.date,
            notes: nextComm.notes || 'No notes available'
          });
        } else if (
          nextCommDate.getDate() === today.getDate() &&
          nextCommDate.getMonth() === today.getMonth() &&
          nextCommDate.getFullYear() === today.getFullYear()
        ) {
          todayComms.push({
            company,
            commDate: nextComm.date,
            notes: nextComm.notes || 'No notes available'
          });
        }
      }
    });

    return { overdueComms, todayComms };
  };

  const { overdueComms, todayComms } = getNotifications();

  const toggleOverride = (companyId, commDate, e) => {
    e.stopPropagation();
    const uniqueId = `${companyId}-${commDate}`;
    if (overriddenCommunications.includes(uniqueId)) {
      setOverriddenCommunications(
        overriddenCommunications.filter((id) => id !== uniqueId)
      );
    } else {
      setOverriddenCommunications([...overriddenCommunications, uniqueId]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Overdue Card */}
        <div className="bg-red-50 p-6 rounded-lg shadow transition-transform duration-300 hover:scale-105">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-semibold text-red-700">
              Overdue Communications
            </h3>
          </div>
          <p className="mt-4 text-3xl font-bold text-red-700">
            {overdueComms.length}
          </p>
        </div>

        {/* Due Today Card */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow transition-transform duration-300 hover:scale-105">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-yellow-700">
              Due Today
            </h3>
          </div>
          <p className="mt-4 text-3xl font-bold text-yellow-700">
            {todayComms.length}
          </p>
        </div>
      </div>

      {/* Lists */}
      <div className="space-y-12">
        {/* Overdue Communications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-red-600 mb-6">
            Overdue Communications
          </h3>
          <div className="space-y-4">
            {overdueComms.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No overdue communications
              </p>
            ) : (
              overdueComms.map(({ company, daysOverdue, commDate, notes }, index) => {
                const uniqueId = `${company.id}-${commDate}`;
                const isOverridden = overriddenCommunications.includes(uniqueId);
                return (
                  <div
                    key={index}
                    className={`relative group ${
                      isOverridden ? 'bg-red-100' : 'bg-red-50'
                    } rounded-lg p-4 border-l-4 ${
                      isOverridden ? 'border-gray-300' : 'border-red-500'
                    } flex justify-between items-center hover:shadow-md transition-all duration-300`}
                  >
                    <div className="flex-1">
                      <div className="text-lg font-medium text-blue-600">
                        {company.name}
                      </div>
                      <div className="text-sm text-blue-600 mt-1">
                        Last communication: {new Date(commDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-red-600 mt-1">
                        {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'} overdue
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleOverride(company.id, commDate, e)}
                      className={`ml-4 text-sm ${
                        isOverridden ? 'text-gray-500' : 'text-red-600'
                      } underline hover:bg-red-100 px-3 py-1 rounded transition-colors`}
                    >
                      {isOverridden ? 'Enable Highlight' : 'Disable Highlight'}
                    </button>
                    
                    {/* Simple CSS Tooltip */}
                    <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm rounded px-2 py-1 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-pre-wrap max-w-xs">
                      {notes}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Due Today Communications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-yellow-600 mb-6">
            Due Today
          </h3>
          <div className="space-y-4">
            {todayComms.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No communications due today
              </p>
            ) : (
              todayComms.map(({ company, commDate, notes }, index) => {
                const uniqueId = `${company.id}-${commDate}`;
                const isOverridden = overriddenCommunications.includes(uniqueId);
                return (
                  <div
                    key={index}
                    className={`relative group ${
                      isOverridden ? 'bg-yellow-100' : 'bg-yellow-50'
                    } rounded-lg p-4 border-l-4 ${
                      isOverridden ? 'border-gray-300' : 'border-yellow-500'
                    } flex justify-between items-center hover:shadow-md transition-all duration-300`}
                  >
                    <div className="flex-1">
                      <div className="text-lg font-medium text-blue-600">
                        {company.name}
                      </div>
                      <div className="text-sm text-blue-600 mt-1">
                        Due: {new Date(commDate).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => toggleOverride(company.id, commDate, e)}
                      className={`ml-4 text-sm ${
                        isOverridden ? 'text-gray-500' : 'text-yellow-600'
                      } underline hover:bg-yellow-100 px-3 py-1 rounded transition-colors`}
                    >
                      {isOverridden ? 'Enable Highlight' : 'Disable Highlight'}
                    </button>
                    
                    {/* Simple CSS Tooltip */}
                    <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm rounded px-2 py-1 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-pre-wrap max-w-xs">
                      {notes}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsView;