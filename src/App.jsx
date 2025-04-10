// 리액트 훅 & 컴포넌트 import
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProjectForm from "./components/ProjectForm";
import ProjectDetails from "./components/ProjectDetails";
import Modal from "./components/Modal";

// 이미지 import
import note from "./assets/note.png";

// App 컴포넌트 - 프로젝트 전체 관리
function App() {
  // 상태 관리
  const [projects, setProjects] = useState([]); // 프로젝트 목록
  const [selectedProjectId, setSelectedProjectId] = useState(null); // 선택된 프로젝트 id
  const [isAdding, setIsAdding] = useState(false); // 프로젝트 추가 모드 여부
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  // 프로젝트 추가 모드 진입
  const startAddProjectHandler = () => {
    setIsAdding(true); // 추가 폼 보여주기
    setSelectedProjectId(null); // 기존 선택 해제
  };

  // 프로젝트 저장
  const saveProjectHandler = ({ title, description, date }) => {
    // 필수 입력값 누락 시 모달 표시
    if (!title || !description || !date) {
      setShowModal(true);
      return;
    }

    // 새 프로젝트 생성
    const newProject = {
      id: Math.random().toString(), // 고유 id 생성
      title, // 제목
      description, // 설명
      date, // 날짜
      tasks: [], // 초기 tasks 배열
    };

    // 프로젝트 목록에 추가
    setProjects((prev) => [...prev, newProject]);
    setIsAdding(false); // 추가 폼 닫기
  };

  // 프로젝트 선택
  const selectProjectHandler = (id) => {
    setSelectedProjectId(id); // 선택한 프로젝트 id 저장
    setIsAdding(false); // 추가 폼 닫기
  };

  // 프로젝트 삭제
  const deleteProjectHandler = () => {
    setProjects((prev) => prev.filter((p) => p.id !== selectedProjectId)); // 선택한 프로젝트 제외
    setSelectedProjectId(null); // 선택 해제
  };

  // Task 추가
  const addTaskHandler = (task) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId
          ? { ...project, tasks: [...project.tasks, task] } // tasks 배열에 추가
          : project
      )
    );
  };

  // Task 삭제
  const deleteTaskHandler = (taskIndex) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              tasks: project.tasks.filter((_, index) => index !== taskIndex), // tasks 배열에서 삭제
            }
          : project
      )
    );
  };

  // 현재 선택된 프로젝트 정보 가져오기
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* 모달 */}
      <Modal show={showModal} onClose={() => setShowModal(false)} />

      {/* 레이아웃 구성 */}
      <main className="h-screen my-8 flex gap-8">
        {/* 사이드바 (왼쪽) */}
        <Sidebar
          projects={projects}
          onSelect={selectProjectHandler}
          onStartAdd={startAddProjectHandler}
          selectedId={selectedProjectId}
        />

        {/* 메인 콘텐츠 (오른쪽) */}
        <div className="flex-1 mt-16">
          {/* 프로젝트 추가 폼 */}
          {isAdding && (
            <ProjectForm
              onSave={saveProjectHandler}
              onCancel={() => {
                setIsAdding(false);
                setSelectedProjectId(null);
              }}
            />
          )}

          {/* 프로젝트 상세보기 */}
          {!isAdding && selectedProject && (
            <ProjectDetails
              project={selectedProject}
              onDelete={deleteProjectHandler}
              onAddTask={addTaskHandler}
              onDeleteTask={deleteTaskHandler}
            />
          )}

          {/* 아무것도 선택되지 않았을 때 */}
          {!isAdding && !selectedProject && (
            <div className="mt-24 text-center">
              <img className="w-16 h-16 object-contain mx-auto" src={note} />
              <h2 className="text-xl font-bold text-stone-500 my-4">선택한 프로젝트가 없습니다</h2>
              <p className="text-stone-400 mb-4">프로젝트를 선택하거나 새 프로젝트를 시작하세요</p>
              <p className="mt-8">
                <button
                  onClick={startAddProjectHandler}
                  className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
                >
                  새 프로젝트 만들기
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
