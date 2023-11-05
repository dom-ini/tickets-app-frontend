import { useQRCode } from "next-qrcode";

type TicketQrProps = {
  token: string;
};

export function TicketQr({ token }: TicketQrProps) {
  const { Image: QRImage } = useQRCode();
  const ticketUrl = "localhost:3000/bilet/" + token;

  return (
    <QRImage
      text={ticketUrl}
      options={{
        margin: 3,
        width: 400,
      }}
    />
  );
}
