import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const communications = [
  {
    id: 1,
    company: "ENTNT",
    location: "Abu Dhabi",
    communications: [
      { type: "LinkedIn Post", date: "12/20/2024" },
      { type: "Email", date: "12/15/2024" }
    ],
    nextDue: {
      type: "LinkedIn Post",
      date: "12/20/2024"
    }
  },
  {
    id: 2,
    company: "GOOGLE",
    location: "California, US",
    communications: [
      { type: "Email", date: "12/25/2024" },
      { type: "Webinar", date: "12/20/2024" }
    ],
    nextDue: {
      type: "Email",
      date: "12/26/2024"
    }
  },
  {
    id: 3,
    company: "MICROSOFT",
    location: "Washington, US",
    communications: [
      { type: "Email", date: "12/26/2024" },
      { type: "Conference Call", date: "12/10/2024" }
    ],
    nextDue: {
      type: "Email",
      date: "12/26/2024"
    }
  },
  {
    id: 4,
    company: "AMAZON",
    location: "Seattle, US",
    communications: [
      { type: "Email", date: "12/28/2024" },
      { type: "Newsletter", date: "12/21/2024" },
      { type: "Phone Call", date: "12/17/2024" }
    ],
    nextDue: {
      type: "Email",
      date: "12/28/2024"
    }
  },
  {
    id: 5,
    company: "META",
    location: "Menlo Park, US",
    communications: [
      { type: "Email", date: "12/22/2024" },
      { type: "Video Call", date: "12/18/2024" }
    ],
    nextDue: {
      type: "Email",
      date: "12/29/2024"
    }
  },
  {
    id: 6,
    company: "APPLE",
    location: "Cupertino, US",
    communications: [
      { type: "Email", date: "12/21/2024" },
      { type: "Product Demo", date: "12/19/2024" },
      { type: "Meeting", date: "12/15/2024" }
    ],
    nextDue: {
      type: "Email",
      date: "12/30/2024"
    }
  }
]

export default function CommunicationsTable() {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Select</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Last 5 Communications</TableHead>
            <TableHead>Next Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {communications.map((comm) => (
            <TableRow key={comm.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{comm.company}</div>
                  <div className="text-sm text-gray-500">{comm.location}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  {comm.communications.map((c, i) => (
                    <div key={i} className="text-sm">
                      <div className="font-medium">{c.type}</div>
                      <div className="text-gray-500">{c.date}</div>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm">
                    <div className="font-medium">{comm.nextDue.type}</div>
                    <div className="text-gray-500">{comm.nextDue.date}</div>
                  </div>
                  <Button variant="link" className="h-auto p-0 text-gray-500">
                    Disable Highlight
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

