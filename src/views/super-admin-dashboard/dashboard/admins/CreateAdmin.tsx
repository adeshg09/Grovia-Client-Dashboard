/* Imports */
import AdminDashboardPage from "@/components/Page/AdminDashboardPage";
import { memo, useEffect, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

/* Relative Imports */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  OutletAdminProfileFormSchema,
  type OutletAdminProfileFormValues,
} from "@/models/super-admin/admin";
import { USER_ROLES, USER_STATUS } from "@/constants";
import AdminDashboardFormLayout from "@/layout/AdminDashboardLayout/components/AdminDashboardFormLayout";
import { PAGE_SUPER_ADMIN_DASHBOARD } from "@/routes/paths";
import { useAdmin } from "@/hooks/dashboard/super-admin/use-admin";
import { removeEmpty } from "@/utilities";

/* Local Imports */

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

/**
 * Component to create the form to create/update admin.
 *
 * @component
 * @returns {JSX.Element}
 */
const CreateAdmin = (): JSX.Element => {
  /* Constants */
  const manageAdminPath = PAGE_SUPER_ADMIN_DASHBOARD.admins.absolutePath;

  /* Hooks */
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    createOutletAdminMutation,
    updateOutletAdminMutation,
    GetOutletAdminByIdMutation,
  } = useAdmin();

  /* States */

  /* Form Setup */
  const form = useForm<OutletAdminProfileFormValues>({
    resolver: zodResolver(OutletAdminProfileFormSchema),
    defaultValues: {
      txtFirstName: "",
      txtLastName: "",
      txtEmail: "",
      txtPhoneNumber: "",
      ddlRole: USER_ROLES.OUTLET_ADMIN,
      ddlStatus: USER_STATUS.ACTIVE,
    },
  });

  /* Functions */
  /**
   * function to get the admin by id with backend action
   * @param {string} adminId - id of admin to fetch the detail
   * @returns {void}
   */
  const getAdminById = async (adminId: string): Promise<void> => {
    await GetOutletAdminByIdMutation.mutateAsync(adminId, {
      onSuccess: (data) => {
        const editAdminData = data?.data;
        form.reset({
          txtFirstName: editAdminData?.profile?.firstName || "",
          txtLastName: editAdminData?.profile?.lastName || "",
          txtEmail: editAdminData?.profile?.email || "",
          txtPhoneNumber: editAdminData?.phoneNumber
            ? editAdminData.phoneNumber.replace(/^\+91/, "")
            : "",
          ddlRole: editAdminData?.role || USER_ROLES.OUTLET_ADMIN,
          ddlStatus: editAdminData?.status || USER_STATUS.ACTIVE,
        });
      },
    });
  };

  /**
   * Handle phone number input change
   * @param {React.ChangeEvent<HTMLInputElement>} e - input change event
   * @returns {void}
   */
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
    form.setValue("txtPhoneNumber", numbersOnly);
  };

  /**
   * Submit function to save/update admin with backend action
   * @param {CreateAdminFormValues} values - input values of form
   * @returns {void}
   */
  const handleFormSubmit = async (
    values: OutletAdminProfileFormValues
  ): Promise<void> => {
    if (id) {
      await updateOutletAdminMutation.mutateAsync({
        adminId: id,
        reqData: removeEmpty({
          firstName: values.txtFirstName,
          lastName: values.txtLastName,
          email: values.txtEmail,
          phoneNumber: values.txtPhoneNumber
            ? "+91" + values.txtPhoneNumber
            : undefined,
          role: values.ddlRole,
          status: values.ddlStatus,
        }),
      });
      navigate(manageAdminPath);
    } else {
      await createOutletAdminMutation.mutateAsync({
        firstName: values.txtFirstName,
        lastName: values.txtLastName,
        email: values.txtEmail,
        phoneNumber: "+91" + values.txtPhoneNumber,
        role: values.ddlRole,
        status: values.ddlStatus,
      });
      navigate(manageAdminPath);
    }
  };

  /**
   * function to handle back button click
   * @returns {void}
   */
  const handleBack = () => {
    navigate(manageAdminPath);
  };

  /* Side-Effects */
  useEffect(() => {
    if (id) {
      getAdminById(id);
    }
  }, [id]);

  /* Output */
  return (
    <AdminDashboardPage title="Create Admin">
      {!GetOutletAdminByIdMutation.isPending ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="w-full h-full"
          >
            <AdminDashboardFormLayout
              title="Create Admin"
              description={
                id
                  ? "Please update the details below to update admin"
                  : "Please fill the below details to create new admin"
              }
              footer={
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={createOutletAdminMutation.isPending}
                    size="lg"
                  >
                    {id ? "Cancel" : "Back"}
                  </Button>
                  <Button
                    type="submit"
                    disabled={createOutletAdminMutation.isPending}
                    size="lg"
                  >
                    {createOutletAdminMutation.isPending ? (
                      <div className="flex items-center justify-between gap-2">
                        <ButtonLoader />
                        {id ? "Updating..." : "Creating..."}
                      </div>
                    ) : id ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </Button>
                </>
              }
            >
              {/* First Name */}
              <FormField
                control={form.control}
                name="txtFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter first name"
                        {...field}
                        maxLength={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="txtLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name"
                        {...field}
                        maxLength={50}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="txtEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                        maxLength={100}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="txtPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                          +91
                        </div>
                        <Input
                          placeholder="Enter phone number"
                          {...field}
                          onChange={handlePhoneNumberChange}
                          className="rounded-l-none"
                          maxLength={10}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="ddlRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={USER_ROLES.OUTLET_ADMIN}>
                          Outlet Admin
                        </SelectItem>
                        <SelectItem value={USER_ROLES.SUPER_ADMIN}>
                          Super Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="ddlStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={USER_STATUS.ACTIVE}>
                          Active
                        </SelectItem>
                        <SelectItem value={USER_STATUS.INACTIVE}>
                          Inactive
                        </SelectItem>
                        <SelectItem value={USER_STATUS.BLOCKED}>
                          Blocked
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Is Active */}
              {/* <FormField
                control={form.control}
                name="chkIsActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Active</FormLabel>
                    <FormControl>
                      <div className="flex flex-row items-center justify-between rounded-lg border p-2">
                        <CardDescription>
                          Enable or disable this admin account
                        </CardDescription>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="cursor-pointer"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              /> */}
            </AdminDashboardFormLayout>
          </form>
        </Form>
      ) : (
        <div className="flex items-center justify-center h-64">
          <ButtonLoader />
        </div>
      )}
    </AdminDashboardPage>
  );
};

export default memo(CreateAdmin);
