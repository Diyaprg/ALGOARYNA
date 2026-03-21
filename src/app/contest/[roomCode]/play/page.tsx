import PlayClient from "./PlayClient";

interface PageProps {
  params: Promise<{
    roomCode: string;
  }>;
}

export default async function ContestPlay({ params }: PageProps) {
  const { roomCode } = await params;
  return <PlayClient roomCode={roomCode} />;
}
