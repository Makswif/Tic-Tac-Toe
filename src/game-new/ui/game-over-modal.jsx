import { UiModal } from "../../uikit/ui-modal";
import { UiButton } from "../../uikit/ui-button";

export function GameOverModal({ winnerName, players }) {
  return (
    <UiModal isOpen={winnerName} onClose={() => console.log("close")}>
      <UiModal.Header>Конец игры</UiModal.Header>
      <UiModal.Body>
        <div className="text-sm">
          <p>
            Победитель: <span className="text-[#b3c6ff]">{winnerName}</span>
          </p>
        </div>
        <div className="mt-4 bg-white rounded-2xl shadow-md mt-2 px-8 py-4 grid grid-cols-2 gap-3 justify-between">
          {players}
        </div>
      </UiModal.Body>
      <UiModal.Footer>
        <UiButton size="md" variant="outline">
          Вернуться
        </UiButton>
        <UiButton size="md" variant="primary">
          Играть снова
        </UiButton>
      </UiModal.Footer>
    </UiModal>
  );
}
