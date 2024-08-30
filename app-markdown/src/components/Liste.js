import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Liste() {
  const fichiers = useSelector((state) => state.storage.data.files);

  return (
    <div>
      <h2>Liste des Fichiers/Dossiers</h2>
      <ul>
        {fichiers.map((f) => (
          <li key={f.id}>
            <Link to={`/${f.id}`}>{f.name}</Link> [{f.type}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Liste;
