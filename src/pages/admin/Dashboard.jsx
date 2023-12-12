import DashboardLayout from "../../components/Layout/AdminLayout";


export default function Dashboard() {
  return (
    <DashboardLayout>
      <div>
        <h2 className="text-xl font-bold">Analytics Overview</h2>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3 p-5 rounded-md shadow hover:shadow-lg">
            <h3>Text</h3>
            <img src="" alt="icon" />
            <p>details</p>
          </div>
          <div className="col-span-3 p-5 rounded-md shadow hover:shadow-lg">2</div>
          <div className="col-span-3 p-5 rounded-md shadow hover:shadow-lg">2</div>
          <div className="col-span-3 p-5 rounded-md shadow hover:shadow-lg">2</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
