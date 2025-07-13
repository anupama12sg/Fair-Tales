import lighthouse from '@lighthouse-web3/sdk';

export default async function uploadToIPFS(data) {
  const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;

  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const file = new File([blob], `${data.title}.json`);

  const response = await lighthouse.upload(file, apiKey);
  return response.data.Hash;
}
