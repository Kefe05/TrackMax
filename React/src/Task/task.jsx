import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import axios from "axios";

function Task({ name, detail, id, handleDelete, handleEdit, handleCompleted }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <input type="checkbox"  onChange={() => handleCompleted(id)}/>
        <div className="flex flex-col">
          <span className="font-semibold text-xl">{name}</span>
          <span>{detail}</span>
        </div>
      </div>
      <div className="flex">
        <CiEdit className="w-11 h-7"
        onClick={() => handleEdit(id)} />
        <FaRegTrashCan className="w-11 h-7" onClick={() => handleDelete(id)} />
      </div>
    </div>
  );
}

export default Task;
