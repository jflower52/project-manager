// Modal 컴포넌트 - 입력값 유효성 검사 알림창
import { useEffect, useRef } from "react";

function Modal({ show, onClose }) {
  // dialog 요소 참조용 ref
  const dialogRef = useRef();

  // show 값이 변경될 때마다 실행
  useEffect(() => {
    if (show) {
      dialogRef.current.showModal(); // 모달 열기
    } else {
      dialogRef.current.close(); // 모달 닫기
    }
  }, [show]);

  return (
    <dialog
      ref={dialogRef} // 모달 참조
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {/* 모달 제목 */}
      <h2 className="text-xl font-bold text-stone-700 my-4">유효하지 않은 입력입니다</h2>

      {/* 모달 내용 */}
      <p className="text-stone-600 mb-4">앗.. 값을 입력해 주세요</p>
      <p className="text-stone-600 mb-4">모든 항목에 유효한 값을 입력해 주세요</p>

      {/* 확인 버튼 영역 */}
      <form method="dialog" className="mt-4 text-right">
        <button
          onClick={onClose} // 클릭 시 모달 닫기
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        >
          확인
        </button>
      </form>
    </dialog>
  );
}

export default Modal;
