// ProjectDetails 컴포넌트 - 선택한 프로젝트 상세 보기 & 작업 관리
import { useRef } from "react";

function ProjectDetails({ project, onDelete, onAddTask, onDeleteTask }) {
  // task 입력값 참조용 ref
  const taskRef = useRef();

  // 작업 추가 버튼 클릭 시 실행
  const handleAddTask = () => {
    const enteredTask = taskRef.current.value; // 입력한 task 값

    if (!enteredTask.trim()) {
      return; // 공백 입력 방지
    }

    onAddTask(enteredTask); // 부모 컴포넌트로 task 전달
    taskRef.current.value = ""; // 입력창 초기화
  };

  return (
    <div>
      {/* 프로젝트 제목 & 삭제 버튼 */}
      <div className="flex items-center max-w-lg mb-2">
        <h2 className="text-2xl font-bold text-stone-700">{project.title}</h2>
        <button
          onClick={onDelete} // 프로젝트 삭제
          className="ml-auto text-sm text-gray-500 hover:text-gray-700"
        >
          삭제
        </button>
      </div>

      {/* 프로젝트 날짜 & 설명 */}
      <p className="text-stone-400 mb-2">{project.date}</p>
      <p className="text-stone-600 mb-4">{project.description}</p>

      {/* 구분선 */}
      <hr className="border-stone-300 my-6 max-w-lg" />

      {/* 작업(Tasks) 제목 */}
      <h3 className="text-lg font-bold text-stone-700 mb-4">작업</h3>

      {/* 작업 추가 영역 */}
      <div className="flex justify-between items-center gap-2 mb-4 max-w-lg">
        <input
          ref={taskRef} // 입력값 참조
          type="text"
          placeholder="작업을 입력하세요..."
          className="flex-1 px-3 py-2 rounded border border-stone-300 bg-stone-200 text-stone-700 focus:outline-none focus:border-stone-600"
        />
        <button
          onClick={handleAddTask} // 작업 추가
          className="px-4 py-2 rounded-md bg-stone-700 text-stone-50 hover:bg-stone-600 whitespace-nowrap"
        >
          작업 추가
        </button>
      </div>

      {/* 작업 리스트 영역 */}
      {project.tasks.length === 0 && <p className="text-stone-400">아직 추가된 작업이 없습니다.</p>}

      {project.tasks.length > 0 && (
        <ul className="space-y-2">
          {project.tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center px-4 py-2 bg-stone-100 rounded max-w-lg"
            >
              {/* 작업 내용 */}
              <span className="text-stone-700">{task}</span>

              {/* 작업 삭제 버튼 */}
              <button
                onClick={() => onDeleteTask(index)} // 해당 작업 삭제
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectDetails;
