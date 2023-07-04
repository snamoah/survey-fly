type Props = {
  error?: string;
};

export const ThankYou = ({ error }: Props) => (
  <>
    <h1>Thank you!</h1>
    <p>{error || 'We appreciate you taking time to answer this survey'}</p>
  </>
);
