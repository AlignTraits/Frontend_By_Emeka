import pathImage from "../../assets/pathWayImage.svg"

const Other = () => {
  return (
    <div className="mt-5">
      <p className="text-[#212121] text-[16px] font-medium">What course are you picking?</p>

      <div className="w-full h-[200px] mt-2 border-[#757575] border-[1px] rounded-xl flex items-center px-5">
        <img src={pathImage} className="h-[150px]" />
      </div>
    </div>
  )
}

export default Other;