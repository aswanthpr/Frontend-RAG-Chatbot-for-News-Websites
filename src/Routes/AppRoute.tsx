import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatWindow from "../components/chat/ChatWindow";


const AppRoute: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/chat"
            element={
              <div className="h-screen flex flex-col">
                <div className="flex-1">
                  <ChatWindow />
                </div>
              </div>
            }
          />
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </div>
    </Router>
  );
};
export default AppRoute