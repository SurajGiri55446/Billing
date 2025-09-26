import { templates } from "../assets/assets";
import "../styles/TemplateGrid.css";
// ✅ Accept selectedTemplate as a prop
const TemplateGrid = ({ onTemplateClick, selectedTemplate }) => {
  return (
    <div className="row g-3">
      {templates.map(({ id, label, image }) => (
        <div className="col-12 col-sm-6 col-lg-4" key={id}>
          <div
            className={`border rounded shadow-sm overflow-hidden template-hover cursor-pointer ${
              selectedTemplate === id ? "border-warning border-3" : "" // ✅ highlight if selected
            }`}
            title={label}
            onClick={() => onTemplateClick(id)}
          >
            <img
              src={image}
              alt={label}
              className="w-100"
              style={{ height: "250px", objectFit: "cover" }}
              loading="lazy"
            />
            <div className="p-2 text-center fw-medium">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;
