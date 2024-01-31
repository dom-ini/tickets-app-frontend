import { useQRCode } from 'next-qrcode';

type TicketQrProps = {
  token: string;
};

export function TicketQr({ token }: TicketQrProps) {
  const { Image: QRImage } = useQRCode();

  return (
    <QRImage
      text={token}
      options={{
        margin: 3,
        width: 400,
      }}
    />
  );
}
