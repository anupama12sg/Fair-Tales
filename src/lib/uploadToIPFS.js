import lighthouse from '@lighthouse-web3/sdk';

export const uploadToIPFS = async (file) => {
  const apiKey = process.env.LIGHTHOUSE_API_KEY;

  const response = await lighthouse.upload(file, apiKey);
  console.log("File Status:", response);

  return `https://ipfs.io/ipfs/${response.data.Hash}`;
};
