/* Imports */
import AdminDashboardPage from "@/components/Page/AdminDashboardPage";
import { type JSX } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ChartLine, Users, DollarSign } from "lucide-react";

// ----------------------------------------------------------------------

const ManageAnalytic = (): JSX.Element => {
  /* Demo Data */
  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      icon: <Users className="h-6 w-6 text-white" />,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      title: "Revenue",
      value: "$34,560",
      icon: <DollarSign className="h-6 w-6 text-white" />,
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Sessions",
      value: "5,230",
      icon: <ChartLine className="h-6 w-6 text-white" />,
      gradient: "from-purple-500 to-purple-700",
    },
  ];

  /* Sample chart data */
  const weeklyVisits = [50, 80, 60, 90, 70, 100, 60];
  const monthlyRevenue = [20, 35, 50, 40, 70, 60, 90, 80, 100, 60, 75, 50];

  return (
    <AdminDashboardPage title="Analytics">
      <div className="flex flex-1 flex-col gap-6 px-6 py-4">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className={`flex items-center justify-between p-5 bg-gradient-to-r ${stat.gradient} text-white shadow-lg hover:shadow-xl transition-all rounded-xl`}
            >
              <div className="flex flex-col">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">{stat.icon}</div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Weekly Visits Chart */}
          <Card className="p-4 shadow-lg rounded-xl hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Weekly Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full flex items-end gap-2">
                {weeklyVisits.map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${val}%` }}
                    className="bg-blue-500 rounded w-4 animate-grow"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Revenue Chart */}
          <Card className="p-4 shadow-lg rounded-xl hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Revenue by Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 w-full flex items-end gap-1">
                {monthlyRevenue.map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${val}%` }}
                    className="bg-green-500 rounded w-3 animate-grow"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tailwind animation for bars */}
      <style>{`
        .animate-grow {
          animation: grow 0.6s ease-out forwards;
        }
        @keyframes grow {
          0% {
            transform: scaleY(0);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </AdminDashboardPage>
  );
};

export default ManageAnalytic;
