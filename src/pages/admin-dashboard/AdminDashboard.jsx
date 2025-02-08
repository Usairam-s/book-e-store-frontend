import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetAllPaymentsQuery } from "../../store/features/paymentApi/paymentApi";

const AdminDashboard = () => {
  const { data, error, isLoading, refetch } = useGetAllPaymentsQuery(); // Fetch payments
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (data) {
      setPayments(data?.data?.payments);
    } else {
      console.log("Error fetching payments");
    }
  }, [data]);

  return (
    <>
      {payments.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-6 py-4">{payment.email}</td>
                  <td className="px-6 py-4">${payment.amount}</td>
                  <td className="px-6 py-4">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="w-full my-4 p-2 text-gray-500">No Payments found</p>
      )}
    </>
  );
};

export default AdminDashboard;
