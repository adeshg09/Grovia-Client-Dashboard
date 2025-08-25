/* Imports */
import AdminDashboardPage from "@/components/Page/AdminDashboardPage";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PAGE_SUPER_ADMIN_DASHBOARD } from "@/routes/paths";
import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { type ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, Eye } from "lucide-react";
import clsx from "clsx";
import { typography } from "@/theme/typography";
import type { OutletAdminProfileModel } from "@/models/super-admin/admin";
import { useAdmin } from "@/hooks/dashboard/super-admin/use-admin";
import { Switch } from "@/components/ui/switch";

/* Component */
const ManageAdmin = (): JSX.Element => {
  /* Hooks */
  const navigate = useNavigate();
  const { getAllOutletAdminsMutation } = useAdmin();

  /* Constants */
  const addAdminPath = PAGE_SUPER_ADMIN_DASHBOARD.admins.create.relativePath;
  const editAdminPath = PAGE_SUPER_ADMIN_DASHBOARD.admins.edit.relativePath;

  /* States */
  const [admins, setAdmins] = useState<OutletAdminProfileModel[]>([]);

  /* Functions */
  /**
   * function to get all the admins
   *
   * @returns {void}
   */
  const handleGetAdmins = async (): Promise<void> => {
    const response = await getAllOutletAdminsMutation.mutateAsync();
    console.log("response", response);

    if (response?.status?.response_code === 200 && response.data?.admins) {
      setAdmins(response.data.admins);
    }
  };
  /**
   * function to navigate to add admin page
   *
   * @returns {void}
   */
  const onAddButtonClick = () => {
    navigate(addAdminPath);
  };

  const handleEdit = (admin: OutletAdminProfileModel) => {
    console.log("edit admin", admin);
    navigate(editAdminPath.replace(":id", admin?.profile?.id));
  };

  const handleDelete = async (admin: OutletAdminProfileModel) => {
    console.log("Delete admin", admin);
  };

  const handleView = (admin: OutletAdminProfileModel) => {
    console.log("View admin", admin);
    // TODO: maybe open side-drawer or detail page
  };

  /* Columns */
  const columns: ColumnDef<OutletAdminProfileModel>[] = [
    {
      accessorKey: "profile",
      header: "Name",
      cell: ({ row }) => {
        const { firstName, lastName } = row.original.profile;
        return (
          <span className={clsx(typography.medium14)}>
            {firstName} {lastName}
          </span>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <span>{row.original.role}</span>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => <span>{row.original.phoneNumber}</span>,
    },
    {
      accessorKey: "profile.email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.profile.email}</span>,
    },
    {
      accessorKey: "outlets",
      header: "Outlet Name",
      cell: ({ row }) => {
        const outlets = row.original.outlets;
        if (!outlets?.length) return <span>-</span>;

        return (
          <div className="flex flex-col gap-1">
            {outlets.map((o) => (
              <span key={o.id}>{o.name}</span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "outlets",
      header: "Outlet Location",
      cell: ({ row }) => {
        const outlets = row.original.outlets;
        if (!outlets?.length) return <span>-</span>;

        return (
          <div className="flex flex-col gap-1">
            {outlets.map((o) => (
              <span key={o.id}>
                {o.city}, {o.state}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "outlets",
      header: "Outlet Status",
      cell: ({ row }) => {
        const outlets = row.original.outlets;
        if (!outlets?.length) return <span>-</span>;

        return (
          <div className="flex flex-col gap-1">
            {outlets.map((o) => {
              const outletColors = {
                open: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
                closed:
                  "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
              };
              return (
                <Badge
                  key={o.id}
                  className={`capitalize ${outletColors[o.status] || ""}`}
                  variant="secondary"
                >
                  {o.status}
                </Badge>
              );
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span>{row.original.status}</span>,
    },
    // {
    //   accessorKey: "isPhoneVerified",
    //   header: "Phone Verified",
    //   cell: ({ row }) => {
    //     return (
    //       <Switch
    //         checked={row.original.isPhoneVerified}
    //         onCheckedChange={(value) => {
    //           console.log("Phone verified switched:", value, row.original.id);
    //         }}
    //       />
    //     );
    //   },
    // },
    // {
    //   accessorKey: "isActivated",
    //   header: "Activated",
    //   cell: ({ row }) => {
    //     return (
    //       <Switch
    //         checked={row.original.isActivated}
    //         onCheckedChange={(value) => {
    //           console.log("Activated switched:", value, row.original.id);
    //         }}
    //       />
    //     );
    //   },
    // },
  ];

  /* Side-Effects */
  useEffect(() => {
    handleGetAdmins();
  }, []);

  /* Output */
  return (
    <AdminDashboardPage
      title="Manage Admins"
      addButtonTitle="Admin"
      onAddButtonClick={onAddButtonClick}
    >
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={admins}
          searchPlaceholder="Search admins..."
          isLoading={getAllOutletAdminsMutation.isPending}
          actions={(admin) => (
            <>
              <DropdownMenuItem onClick={() => handleView(admin)}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(admin)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(admin)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </>
          )}
          getRowId={(row) => row.id}
          addButtonTitle="Admin"
          onAddButtonClick={onAddButtonClick}
        />
      </div>
    </AdminDashboardPage>
  );
};

export default ManageAdmin;
