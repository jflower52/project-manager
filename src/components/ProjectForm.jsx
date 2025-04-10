// ProjectForm 컴포넌트 - 프로젝트 추가/수정 입력 폼
import { useRef } from "react";

function ProjectForm({ onSave, onCancel }) {
  // input, textarea, date를 참조할 ref 생성
  const titleRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();

  // 저장 버튼 클릭 시 실행되는 함수
  const handleSave = () => {
    const title = titleRef.current.value; // 제목 값
    const description = descRef.current.value; // 내용 값
    const date = dateRef.current.value; // 마감일 값

    // 부모 컴포넌트로 데이터 전달
    onSave({ title, description, date });
  };

  return (
    <div className="w-[35rem]">
      {/* 상단 메뉴 (취소 / 저장 버튼) */}
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            onClick={onCancel} // 클릭 시 폼 닫기
            className="text-stone-800 hover:text-stone-950"
          >
            취소
          </button>
        </li>
        <li>
          <button
            onClick={handleSave} // 클릭 시 데이터 저장 시도
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            저장
          </button>
        </li>
      </menu>

      {/* 입력 폼 영역 */}
      <div>
        {/* 제목 입력 */}
        <p className="flex flex-col gap-1 my-4">
          <label className="text-sm font-bold uppercase text-stone-500">제목</label>
          <input
            ref={titleRef} // 입력값 참조
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            type="text"
          />
        </p>

        {/* 내용 입력 */}
        <p className="flex flex-col gap-1 my-4">
          <label className="text-sm font-bold uppercase text-stone-500">내용</label>
          <textarea
            ref={descRef} // 입력값 참조
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          ></textarea>
        </p>

        {/* 마감일 입력 */}
        <p className="flex flex-col gap-1 my-4">
          <label className="text-sm font-bold uppercase text-stone-500">마감일</label>
          <input
            ref={dateRef} // 입력값 참조
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            type="date"
          />
        </p>
      </div>
    </div>
  );
}

export default ProjectForm;
