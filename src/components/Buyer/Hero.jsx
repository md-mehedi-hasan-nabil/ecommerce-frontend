import { Carousel, Sidebar } from "flowbite-react";
import banner1 from "../../assets/banner/banner 1.jpg";
import banner2 from "../../assets/banner/banner 2.jpg";
import banner3 from "../../assets/banner/banner 3.jpg";
import banner4 from "../../assets/banner/banner 4.jpg";

export default function Hero() {
  return (
    <>
      <div className="grid grid-cols-12">
        {/* <aside className="hidden md:block col-span-2">
          <div className="w-full md:w-fit h-56 sm:h-64 xl:h-80 2xl:h-96 overflow-y-auto">
            <Sidebar aria-label="Sidebar with multi-level dropdown example" style={{width: '100% !important'}}>
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Sidebar.Item href="#">Dashboard</Sidebar.Item>
                  <Sidebar.Collapse label="E-commerce">
                    <Sidebar.Item href="#">Products</Sidebar.Item>
                    <Sidebar.Item href="#">Product 2</Sidebar.Item>
                    <Sidebar.Item href="#">Product 3</Sidebar.Item>
                    <Sidebar.Item href="#">Product 4</Sidebar.Item>
                  </Sidebar.Collapse>
                  <Sidebar.Item href="#">Inbox</Sidebar.Item>
                  <Sidebar.Item href="#">Users</Sidebar.Item>
                  <Sidebar.Item href="#">Products</Sidebar.Item>
                  <Sidebar.Item href="#">Sign In</Sidebar.Item>
                  <Sidebar.Item href="#">Sign Up</Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </Sidebar>
          </div>
        </aside> */}
        <div className="col-span-12">
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
              <img src={banner1} alt="..." />
              <img src={banner2} alt="..." />
              <img src={banner4} alt="..." />
              <img src={banner3} alt="..." />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}
