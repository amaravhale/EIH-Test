import { KanbanColumn } from "@/components/domain/kanban-column";

const MOCK_BOARD = [
  {
    id: "col-1",
    title: "Qualification",
    value: "£4.2M",
    items: [
      {
        id: "t-1",
        title: "Offshore Process Safety Audit Framework",
        client: "Equinor",
        value: "£850k",
        deadline: "Oct 24",
        probability: 30,
        tags: ["Offshore", "Audit"]
      },
      {
        id: "t-2",
        title: "Global PHA Software Rollout",
        client: "BASF",
        value: "£2.1M",
        deadline: "Nov 15",
        probability: 15,
        tags: ["Software", "Enterprise"]
      }
    ]
  },
  {
    id: "col-2",
    title: "Proposal Creation",
    value: "£1.8M",
    items: [
      {
        id: "t-3",
        title: "Hydrogen Storage Risk Assessment",
        client: "BP",
        value: "£450k",
        deadline: "Sep 30",
        probability: 60,
        tags: ["Hydrogen", "Risk"]
      }
    ]
  },
  {
    id: "col-3",
    title: "Submitted",
    value: "£850k",
    items: [
      {
        id: "t-4",
        title: "COMAH Safety Report Update",
        client: "Ineos",
        value: "£350k",
        deadline: "Aug 15",
        probability: 45,
        tags: ["COMAH", "Compliance"]
      }
    ]
  },
  {
    id: "col-4",
    title: "Shortlisted",
    value: "£1.2M",
    items: [
      {
        id: "t-5",
        title: "Process Safety Culture Program",
        client: "Shell",
        value: "£1.2M",
        deadline: "Jul 10",
        probability: 80,
        tags: ["Culture", "Training"]
      }
    ]
  }
];

export function KanbanBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-220px)] min-h-[500px]">
      {MOCK_BOARD.map(col => (
        <KanbanColumn 
          key={col.id}
          title={col.title}
          count={col.items.length}
          value={col.value}
          items={col.items}
        />
      ))}
    </div>
  );
}
