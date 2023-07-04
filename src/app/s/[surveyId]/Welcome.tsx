type Props = {
  onClickStart: () => void;
};

export const Welcome = ({ onClickStart }: Props) => (
  <div className="text-center">
    <h1>Welcome to this survey</h1>
    <p>This is a custom text</p>
    <button onClick={onClickStart} className="btn bg-purple-500">
      Begin
    </button>
  </div>
);
