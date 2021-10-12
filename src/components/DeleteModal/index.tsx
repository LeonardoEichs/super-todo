import { Container } from "./styles";

interface DeleteModelProps {
  onClose: any;
}

function DeleteModal({ onClose }: DeleteModelProps) {
  return (
    <Container>
      <h1>Deletar</h1>
      <h2>Você tem certeza que quer deletar?</h2>
      <button onClick={onClose}>Não</button>
      <button>Sim</button>
    </Container>
  );
}

export default DeleteModal;
