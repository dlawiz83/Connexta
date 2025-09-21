import Button from "./Button";
import actions from "../data/actions.json";
import { MessageSquare, Mail, Phone } from "lucide-react";

function NextActionsCard() {
  const colors = {
    Prospect: "bg-blue-100 text-blue-800",
    "Reached Out": "bg-yellow-100 text-yellow-800",
    "Chat Scheduled": "bg-purple-100 text-purple-800",
    Interviewing: "bg-green-100 text-green-800",
    Referred: "bg-teal-100 text-teal-800",
  };
  return (
    <div className="bg-white w-full h-auto rounded-xl border">
      <div className="m-6 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-[14px] font-medium">Upcoming Next Actions</h1>
          <p className="text-gray-500 text-[14px]">
            Follow-ups and tasks that need your attention
          </p>
        </div>

        <Button
          width="w-28"
          height="h-10"
          onClick={() => alert("Custom button!")}
        >
          + Add Action
        </Button>
      </div>
      <div className="m-6">
        <table className=" w-full border-collapse ">
          <thead>
            <tr className="px-6 py-3 text-left  border-b ">
              <th className="px-4 py-2  text-[13px] font-medium text-gray-800">
                Contact
              </th>
              <th className="px-4 py-2 text-[13px] font-medium text-gray-800">
                Stage
              </th>
              <th className="px-4 py-2 text-[13px] font-medium text-gray-800">
                Next Action
              </th>
              <th className="px-4 py-2 text-[13px] font-medium text-gray-800">
                Due Date
              </th>
              <th className="px-4 py-2 text-[13px] font-medium text-gray-800">
                Last Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {actions.map((item, index) => (
              <tr key={index} className="border-b">
                <div className="flex flex-col">
                  <span className="text-[13px]">{item.name}</span>
                  <span className="text-gray-500 text-[13px]">
                    {item.company}
                  </span>
                </div>
                <td className="px-4 py-2 text-[13px] font-normal">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      colors[item.stage] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.stage}
                  </span>
                </td>
                <td className="px-4 py-2 text-[13px] font-normal">
                  <div className="flex items-center gap-1">
                    {item.nextAction === "Email" && <Mail size={13} />}
                    {item.nextAction === "Call" && <Phone size={13} />}
                    {item.nextAction === "Dm" && <MessageSquare size={13} />}
                    {item.nextAction}{" "}
                  </div>
                </td>
                <td className="px-4 py-2 text-[13px] font-normal">
                  {item.dueDate}
                </td>
                <td className="px-4 py-2 text-[13px] font-normal text-gray-500">
                  {item.lastContact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NextActionsCard;
