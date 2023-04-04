export function Membership() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <h4 className="fontmed] py-2 text-center text-lg font-light">You are not a member yet</h4>
      <div className="flex items-center justify-evenly bg-opacity-20 px-4 pt-4 pb-10">
        <button className="bg-blue-50 px-4 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-100">
          Apply for membership
        </button>
      </div>
    </div>
  )
}
