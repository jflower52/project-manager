// Sidebar 컴포넌트 - 프로젝트 목록 & 프로젝트 추가 버튼 영역
function Sidebar({ projects, onSelect, onStartAdd, selectedId }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      {/* 사이드바 제목 */}
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">내 프로젝트</h2>

      {/* 프로젝트 추가 버튼 */}
      <div>
        <button
          onClick={onStartAdd} // 클릭 시 프로젝트 추가 모드 진입
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        >
          + 프로젝트 추가
        </button>
      </div>

      {/* 프로젝트 목록 */}
      <ul className="mt-8">
        {projects.map((project) => (
          <li
            key={project.id} // 고유 key 값
            onClick={() => onSelect(project.id)} // 클릭 시 해당 프로젝트 선택
            className={`cursor-pointer p-2 rounded ${
              selectedId === project.id
                ? "bg-stone-700 text-stone-300" // 선택된 프로젝트 스타일
                : "hover:bg-stone-800" // Hover 스타일
            }`}
          >
            {project.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
