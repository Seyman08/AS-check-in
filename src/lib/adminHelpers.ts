export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "on-time":
      return "bg-green-100 border border-green-600 text-black capitalize mt-2 rounded-full px-3 py-1 font-semibold";
    case "late":
      return "bg-red-100 border border-red-600 text-black mt-2 capitalize rounded-full px-3 py-1 font-semibold";
    case "early":
      return "bg-blue-100 border border-blue-600 text-black mt-2 capitalize rounded-full px-3 py-1 font-semibold";
    default:
      return "bg-gray-100 border border-gray-700 px-3 py-1 text-black rounded-full";
  }
};
