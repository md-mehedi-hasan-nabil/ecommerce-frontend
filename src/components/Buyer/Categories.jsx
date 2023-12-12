import { Button } from "flowbite-react";

export default function Categories() {
  return (
    <div className="flex flex-col md:grid grid-cols-4 mt-5 px-2">
      <div className="flex justify-center items-center gap-2 p-4 rounded-md hover:bg-slate-200">
        <img
          src="https://transvelo.github.io/electro-html/2.0/assets/img/190X150/img1.png"
          alt=""
        />
        <div>
          <h3 className="text-lg">
            CATCH BIG <strong>DEALS</strong> ON THE CAMERAS
          </h3>
          <Button size="xs">Shop now</Button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 p-4 rounded-md hover:bg-slate-200">
        <img
          src="https://transvelo.github.io/electro-html/2.0/assets/img/190X150/img2.jpg"
          alt=""
        />
        <div>
          <h3 className="text-lg">
            CATCH BIG <strong>DEALS</strong> ON THE CAMERAS
          </h3>
          <Button size="xs">Shop now</Button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 p-4 rounded-md hover:bg-slate-200">
        <img
          src="https://transvelo.github.io/electro-html/2.0/assets/img/190X150/img3.jpg"
          alt=""
        />
        <div>
          <h3 className="text-lg">
            CATCH BIG <strong>DEALS</strong> ON THE CAMERAS
          </h3>
          <Button size="xs">Shop now</Button>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 p-4 rounded-md hover:bg-slate-200">
        <img
          src="https://transvelo.github.io/electro-html/2.0/assets/img/190X150/img4.png"
          alt=""
        />
        <div>
          <h3 className="text-lg">
            CATCH BIG <strong>DEALS</strong> ON THE CAMERAS
          </h3>
          <Button size="xs">Shop now</Button>
        </div>
      </div>
    </div>
  );
}
