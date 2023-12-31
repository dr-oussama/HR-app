import { useState } from "react";
import { BsDownload } from "react-icons/bs";
import useDocument from "../hooks/useDocument";

const DocumentList = () => {
  const { documents, isLoading, error } = useDocument();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = documents?.filter((document) =>
    document.document_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Departements List</h2>
      </div>
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search documents..."
          className="w-35percent flex-1 px-4 py-2 border border-gray-300 rounded"
        />
      </div>
      {isLoading ? (
        <p className="text-center py-4">Loading...</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Document id</th>
              <th className="py-2 px-4 text-left">Document name</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs?.map((document) => (
              <tr
                key={document.document_id}
                className="border-b border-gray-300"
              >
                <td className="py-2 px-4">{document.document_id}</td>
                <td className="py-2 px-4">{document.document_name}</td>
                <td className="py-2 px-4">
                  <a href={"/uploads/"+document.document_file} download>
                    <BsDownload
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {}}
                    />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DocumentList;
