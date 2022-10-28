import React, { useRef, useState } from "react";
export default function UpLoadView() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [lastUpload, setLastUpload] = useState<string | null>(null);

    const UpLoadClick = async () => {
        const files = inputRef.current!.files;
        if (files && files.length > 0) {
            const file = files[0];
            const retUrl = await DoUpload(`Images/${file.name}`, files[0]);
            if (retUrl) {
                setLastUpload(retUrl);
            }
        }
    };
    return (
        <div>
            <input
                id="photoupload"
                type="file"
                ref={inputRef}
                accept="image/*"
            />
            <button onClick={UpLoadClick}>{"Upload"}</button>
            {!!lastUpload && <img src={lastUpload!}></img>}
        </div>
    );
}

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
async function DoUpload(remotePath: string, file: File) {
    const BucketName = "my-new-bucket";
    const HostName = "hk4e-anim-ta.mihoyo.com:8333";
    const Protocol = "http";
    // Initialize the Amazon Cognito credentials provider
    const s3 = new S3Client({
        region: "us-east-2",
        endpoint: {
            hostname: HostName,
            protocol: Protocol,
            path: "/",
        },
        credentials: {
            accessKeyId: " ",
            secretAccessKey: " ",
        },
        forcePathStyle: true,
        bucketEndpoint: false,
    });
    const uploadParams = {
        Bucket: BucketName,
        Key: remotePath,
        Body: file,
    };
    try {
        await s3.send(new PutObjectCommand(uploadParams));
        alert("Successfully uploaded photo.");
        return `${Protocol}://${HostName}/${BucketName}/${remotePath}`;
    } catch (err: any) {
        return alert(`There was an error uploading your photo: ${err.message}`);
    }
}
