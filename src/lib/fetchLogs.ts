// import { Log } from "@/app/(admin)/admin/components/LogTable";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";

// const db = getFirestore();

// export async function fetchLogsByDate(date: string): Promise<Log[]> {
//   const q = query(collection(db, "logs"), where("date", "==", date));
//   const snapshot = await getDocs(q);

//   return snapshot.docs.map((doc) => {
//     const data = doc.data();
//     return {
//       id: doc.id,
//       userId: data.userId,
//       name: data.name,
//       date: data.date,
//       checkInTime: data.checkInTime ?? null,
//       checkOutTime: data.checkOutTime ?? null,
//       status: data.status,
//     };
//   });
// }
