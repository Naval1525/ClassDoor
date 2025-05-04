import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Professor {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
}

interface College {
  id: number;
  name: string;
  expanded: boolean;
  showProfessors: boolean;
  showCourses: boolean;
  professors: Professor[];
  courses: Course[];
}

const RightSideBar: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([
    {
      id: 1,
      name: "Bennett University",
      expanded: false,
      showProfessors: false,
      showCourses: false,
      professors: [
        { id: 1, name: "Dr. Smith" },
        { id: 2, name: "Dr. Johnson" },
      ],
      courses: [
        { id: 1, name: "Data Structures" },
        { id: 2, name: "Algorithms" },
      ],
    },
    {
      id: 2,
      name: "XYZ College",
      expanded: false,
      showProfessors: false,
      showCourses: false,
      professors: [
        { id: 3, name: "Dr. Williams" },
        { id: 4, name: "Dr. Brown" },
      ],
      courses: [
        { id: 3, name: "Web Development" },
        { id: 4, name: "Database Systems" },
      ],
    },
    {
      id: 3,
      name: "ABC University",
      expanded: false,
      showProfessors: false,
      showCourses: false,
      professors: [
        { id: 5, name: "Dr. Davis" },
        { id: 6, name: "Dr. Wilson" },
      ],
      courses: [
        { id: 5, name: "Artificial Intelligence" },
        { id: 6, name: "Machine Learning" },
      ],
    },
  ]);

  const toggleCollege = (id: number): void => {
    setColleges(
      colleges.map((college) =>
        college.id === id
          ? { ...college, expanded: !college.expanded }
          : college
      )
    );
  };

  const toggleProfessors = (id: number, event: React.MouseEvent): void => {
    event.stopPropagation();
    setColleges(
      colleges.map((college) =>
        college.id === id
          ? { ...college, showProfessors: !college.showProfessors }
          : college
      )
    );
  };

  const toggleCourses = (id: number, event: React.MouseEvent): void => {
    event.stopPropagation();
    setColleges(
      colleges.map((college) =>
        college.id === id
          ? { ...college, showCourses: !college.showCourses }
          : college
      )
    );
  };

  return (
    <div className="w-full h-full bg-black border-l border-gray-800 text-white">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Directory</h1>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
        <div className="space-y-3">
          {colleges.map((college) => (
            <div key={college.id} className="border border-gray-800 rounded-md bg-gray-900">
              <div
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-800 rounded-t-md transition-colors"
                onClick={() => toggleCollege(college.id)}
              >
                <div className="flex items-center">
                  {college.expanded ? (
                    <ChevronDown size={20} className="text-gray-400" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-400" />
                  )}
                  <span className="ml-2 text-gray-200">
                    x/{college.name.toLowerCase().replace(/\s+/g, "")}
                  </span>
                </div>
              </div>

              {college.expanded && (
                <div className="pl-8 pr-4 pb-3">
                  <div
                    className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-800 rounded-md transition-colors"
                    onClick={(e) => toggleProfessors(college.id, e)}
                  >
                    <span className="text-gray-300">Professors</span>
                    {college.showProfessors ? (
                      <ChevronDown size={16} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-400" />
                    )}
                  </div>

                  {college.showProfessors && (
                    <div className="pl-6 mt-1 space-y-1">
                      {college.professors.map((professor) => (
                        <div
                          key={professor.id}
                          className="p-2 hover:bg-gray-800 rounded-md cursor-pointer text-gray-300 transition-colors"
                        >
                          x/{professor.name.toLowerCase().replace(/\s+/g, "")}
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-800 rounded-md mt-1 transition-colors"
                    onClick={(e) => toggleCourses(college.id, e)}
                  >
                    <span className="text-gray-300">Courses</span>
                    {college.showCourses ? (
                      <ChevronDown size={16} className="text-gray-400" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-400" />
                    )}
                  </div>

                  {college.showCourses && (
                    <div className="pl-6 mt-1 space-y-1">
                      {college.courses.map((course) => (
                        <div
                          key={course.id}
                          className="p-2 hover:bg-gray-800 rounded-md cursor-pointer text-gray-300 transition-colors"
                        >
                          x/{course.name.toLowerCase().replace(/\s+/g, "")}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;