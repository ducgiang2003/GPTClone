// app/api/generate-image/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json();
        const outputFilePath = 'public/temp-image.png';

        const args = [
            'ai-image-generator',
            prompt,
            '--width', '512',
            '--height', '512',
            '--num_inference_steps', '50',
            '--guidance_scale', '7.5',
            '--output', outputFilePath,
        ];

        exec(`npx ${args.join(' ')}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            fs.access(outputFilePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
                }
                return NextResponse.json({ imageUrl: `/temp-image.png` });
            });
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
