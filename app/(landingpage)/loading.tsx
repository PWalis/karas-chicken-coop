
export default function Loading() {
  return (
    <div className="loading-bg w-screen h-screen flex justify-center items-center place-items-center">
      <div className="flex-row place-items-center items-center justify-center align-middle">
        <div className="justify center items-center pl-[62px] pb-5">
      <span className="loading loading-ring loading-lg"></span>
      </div>
      <div> <p className="uppercase">Getting our eggs in order..</p> </div>
      </div>
    </div>
  );
}
