import React, { useEffect, useState } from "react";

const AddBrandForm = (props: any) => {
  const [newBrand, setNewBrand] = useState<any>();
  const handleChange = (event: any) => {
    setNewBrand(event.target.value);
  };
  useEffect(() => {
    props.handleGetBrand(newBrand);
  }, [newBrand]);

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="name"
              placeholder="Tên thương hiệu"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBrandForm;
