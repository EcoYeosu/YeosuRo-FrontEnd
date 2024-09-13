import * as React from "react";

const ComunuityId = (props:any) => {
  console.log(props)
  return (
    <div className="w-360 mx-auto border border-1 border-black ">
        커뮤니티{props.params.id}
    </div>
  );
};

export default ComunuityId;

