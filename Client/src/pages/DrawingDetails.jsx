import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DrawingBoard from '../components/DrawingBoard';
import LoadingSpin from '../components/LoadingSpin';
import { getDrawingById } from '../utils/api';

const DrawingDetails = () => {
    const { id } = useParams();
    const [drawing, setDrawing] = useState(null);

    useEffect(() => {
        const fetchDrawing = async () => {
            try {
                const data = await getDrawingById(id);
                setDrawing(data);
            } catch (error) {
                console.error('Error fetching drawing:', error);
            }
        };

        fetchDrawing();
    }, [id]);

    if (!drawing) {
        return <LoadingSpin />;
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">{drawing.title}</h1>
            <p className='inline-block border p-4 shadow-md mb-4'>
                <strong>Created at:</strong>
                {new Date(drawing.created_at).toLocaleString()}
            </p>
            <p className='inline-block border p-4 shadow-md mb-4'>
                <strong>Last updated:</strong>
                {new Date(drawing.updated_at).toLocaleString()}
            </p>
            <div className="mt-4">
                <DrawingBoard initialData={drawing} />
            </div>
        </div>
    );
};

export default DrawingDetails;
