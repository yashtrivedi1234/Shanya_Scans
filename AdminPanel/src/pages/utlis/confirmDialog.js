import Swal from "sweetalert2";

export const confirmDialog = async (title, text) => {
  const result = await Swal.fire({
    title: title || "Are you sure?",
    text: text || "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  return result.isConfirmed; // true agar user "Yes" kare, false agar "No" kare
};
