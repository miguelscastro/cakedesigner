import { Link, useLocation } from "react-router-dom";
import { Container } from "./styles";

export function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  const visiblePaths = paths.filter(
    (segment) => segment !== "user" && segment !== "admin"
  );

  return (
    <Container>
      {visiblePaths.map((segment, index) => {
        const actualIndex = paths.indexOf(segment);
        const path = "/" + paths.slice(0, actualIndex + 1).join("/");
        const label = breadcrumbLabels[segment] || segment;
        const isLast = index === visiblePaths.length - 1;

        return (
          <span key={path}>
            {!isLast ? (
              <>
                <Link to={path}>{label}</Link> /{" "}
              </>
            ) : (
              <strong>{label}</strong>
            )}
          </span>
        );
      })}
    </Container>
  );
}

const breadcrumbLabels: Record<string, string> = {
  profile: "Meu perfil",
  "my-data": "Minhas informações",
  "personal-data": "Dados pessoais",
  "account-data": "Dados da conta",
  "security-settings": "Segurança",
  "manage-info": "Formas de segurança",
  "delete-account": "Excluir conta",
  purchases: "Compras",
};
