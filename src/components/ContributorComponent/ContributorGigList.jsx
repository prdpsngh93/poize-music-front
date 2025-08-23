"use client";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";


export default function GigList({ data, onPageChange, fetchData }) {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedGig, setSelectedGig] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [gigToDelete, setGigToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [gigToUpdate, setGigToUpdate] = useState(null);
  const router = useRouter();

  console.log(data)
  const getStatusClasses = (status) => {
    if (status === "published" || status === "active")
      return "bg-green-100 text-green-700";
    if (status === "draft") return "bg-gray-100 text-gray-700";
    return "bg-blue-100 text-blue-700";
  };
const collaboratorId = Cookies.get("id");
  const handleStatusChange = async (newStatus) => {
    if (!gigToUpdate) return;
    

    setLoading(true);
    try {
      await axios.post(
        `https://poize-music-backend-kn0u.onrender.com/api/venue-gigs/status`,
        {
          artist_id: collaboratorId,
          gig_id: gigToUpdate.id,
          status: newStatus,
        }
      );

      toast.success(`Status updated to ${newStatus}!`);
      setStatusModalOpen(false);
      setGigToUpdate(null);
      fetchData(); // Refresh list
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  /** Handle Delete Gig */
  const handleDeleteGig = async () => {
    if (!gigToDelete) return;
    setLoading(true);
    try {
      await axios.delete(
        `https://poize-music-backend-kn0u.onrender.com/api/contributor-gigs/${gigToDelete.id}`
      );
      toast.success("Gig deleted successfully!");
      setDeleteModalOpen(false);

      setGigToDelete(null);
      fetchData();
      // router.refresh(); // Refresh page to update gig list
    } catch (err) {
      console.error("Error deleting gig:", err);
      toast.error("Failed to delete gig.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800">
      {/* Tabs */}
      <div className="flex justify-start items-start mb-6 rounded-full bg-white p-1 max-w-3xl">
        <button
          onClick={() => setActiveTab("list")}
          className={`w-1/2 py-2 rounded-full text-sm font-semibold capitalize transition ${
            activeTab === "list"
              ? "bg-[#1FB58F] text-white shadow"
              : "text-gray-600"
          }`}
        >
          List
        </button>
        <button
          onClick={() => setActiveTab("calendar")}
          className={`w-1/2 py-2 rounded-full text-sm font-semibold capitalize transition ${
            activeTab === "calendar"
              ? "bg-[#1FB58F] text-white shadow"
              : "text-gray-600"
          }`}
        >
          Calendar
        </button>
      </div>

      {/* Table View */}
      {activeTab === "list" && (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-semibold">
              <tr>
                <th className="p-4">Gig</th>
                <th className="p-4">Date</th>
                <th className="p-4">Venue</th>
                <th className="p-4">Musician</th>
                <th className="p-4">Status</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-800">
              {data?.items?.length > 0 ? (
                data.items.map((gig) => (
                  <tr key={gig.id} className="hover:bg-gray-50">
                    <td className="p-4 break-words">{gig.gig_title}</td>
                    <td className="p-4 break-words">{gig.date}</td>
                    <td className="p-4 break-words">{gig.venue_type}</td>
                    <td className="p-4 break-words">
                      {gig.artist?.name || "N/A"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                          gig.status
                        )}`}
                      >
                        {gig.status}
                      </span>
                    </td>
                    <td className="p-4 break-words">
                      {gig.payment === "0.00" ? "Unpaid" : `$${gig.payment}`}
                    </td>
                    <td className="p-4 space-x-2 text-blue-600 text-sm break-words">
                      <button
                        onClick={() => {
                          setGigToUpdate(gig);
                          setStatusModalOpen(true);
                        }}
                        className="hover:underline"
                      >
                        Status
                      </button>

                       <button
                        onClick={() => router.push(`/edit-gig/${gig.id}`)}
                        className="hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setSelectedGig(gig)}
                        className="hover:underline"
                      >
                        View
                      </button>
                      {gig.status !== "Booked" && (
  <button
    onClick={() => router.push(`/confirm-booking/${gig.id}`)}
    className="hover:underline"
  >
    Confirm
  </button>
)}
                      <button
                        onClick={() => {
                          setGigToDelete(gig);
                          setDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500 font-medium"
                  >
                    No gigs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 text-sm">
            <span>
              Page {data?.currentPage} of {data?.totalPages}
            </span>
            <div className="space-x-2">
              <button
                disabled={data?.currentPage === 1}
                onClick={() => onPageChange(data.currentPage - 1)}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Prev
              </button>
              <button
                disabled={data?.currentPage === data?.totalPages}
                onClick={() => onPageChange(data.currentPage + 1)}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Viewing Gig */}
      <Modal
        isOpen={!!selectedGig}
        onClose={() => setSelectedGig(null)}
        title="Gig Details"
      >
        {selectedGig && (
          <div className="space-y-2 max-h-[70dvh] overflow-y-auto">
            <p>
              <strong>Title:</strong> {selectedGig.gig_title}
            </p>
            <p>
              <strong>Date:</strong> {selectedGig.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedGig.time}
            </p>
            <p>
              <strong>Venue:</strong> {selectedGig.venue_type}
            </p>
            <p>
              <strong>Genre:</strong> {selectedGig.genre}
            </p>
            <p>
              <strong>Description:</strong> {selectedGig.description}
            </p>
            <p>
              <strong>Musician:</strong> {selectedGig.artist?.name}
            </p>
            <p>
              <strong>Payment:</strong> ${selectedGig.payment}
            </p>
            {selectedGig.attachment_url && (
              <img
                src={selectedGig.attachment_url}
                alt="Attachment"
                className="w-full rounded-lg mt-3"
              />
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Gig"
      >
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete this gig? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="px-4 py-2 rounded-full border text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteGig}
            className="px-4 py-2 rounded-full bg-red-600 text-white text-sm hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
      <Modal
  isOpen={statusModalOpen}
  onClose={() => setStatusModalOpen(false)}
  title="Change Gig Status"
>
  <p className="mb-4 text-gray-700">
    Select a new status for <strong>{gigToUpdate?.gig_title}</strong>:
  </p>
  <div className="flex flex-col gap-3">
    {["active", "draft", "completed"].map((status) => (
      <button
        key={status}
        onClick={() => handleStatusChange(status)}
        className="px-4 py-2 rounded-full bg-gray-100 hover:bg-[#1FB58F] hover:text-white transition"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </button>
    ))}
  </div>
</Modal>

    </div>
  );
}
