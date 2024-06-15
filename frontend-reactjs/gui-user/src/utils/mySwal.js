import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export const submitExaminingSwal = () => {
  return MySwal.fire({
      title: "Xác nhận nộp bài",
      text: "Bạn có chắc chắn muốn nộp bài không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      reverseButtons: true,
  }).then((result) => {
      return result.isConfirmed; // Trả về kết quả từ SweetAlert2
  });
};

export const checkExaminingSwal = () => {
  return MySwal.fire({
      title: "Xác nhận làm lại",
      text: "Bạn đã làm bài này rồi, có chắc chắn làm lại bài tập này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      reverseButtons: true,
  }).then((result) => {
      return result.isConfirmed; // Trả về kết quả từ SweetAlert2
  });
};

export const errorSwal = () => {
  return MySwal.fire({
      title: "Lỗi",
      text: "Đã có lỗi xảy ra",
      icon: "error",
  }).then((result) => {
      return result.isConfirmed; // Trả về kết quả từ SweetAlert2
  });
};

export const outSideExamSwal = () => {
  return MySwal.fire({
      title: "Bài thi đã kết thúc",
      text: "Bài thi đã kết thúc, ngoài thời gian thi!",
      icon: "warning",
  }).then((result) => {
      return result.isConfirmed; // Trả về kết quả từ SweetAlert2
  });
};

export const exitExamSwal = () => {
  return MySwal.fire({
      title: "Bạn đang thoát bài thi",
      text: "Khi thoát, bài thi sẽ không được tính!",
      icon: "warning",
  }).then((result) => {
      return result.isConfirmed; // Trả về kết quả từ SweetAlert2
  });
};
