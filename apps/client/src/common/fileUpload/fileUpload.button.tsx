import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { Button, ButtonTypeMap, ExtendButtonBase, Tooltip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';
import React, { useRef } from 'react';

export function FileUploadButton({
    onUpload,
    content,
    loading,
    accept,
    ...props
}: {
    onUpload: (files: FileList | null) => void | Promise<void>;
    content?: React.ReactNode;
    accept?: string;
    loading?: boolean;
} & React.ComponentProps<ExtendButtonBase<ButtonTypeMap<unknown, 'button'>>>) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input
                ref={inputRef}
                multiple
                type="file"
                onChange={(e) => {
                    onUpload(e.target.files);
                    e.target.value = '';
                }}
                accept={accept}
                style={{ display: 'none' }}
            />
            <Tooltip title={content!} placement="top">
                <Button
                    variant="contained"
                    sx={{
                        height: '30px',
                        width: '40px',
                        padding: '0px',
                        minWidth: '0px',
                        backgroundColor: blue[600],
                        color: 'white',
                        '&:hover': {
                            backgroundColor: blue[700],
                        },
                    }}
                    endIcon={loading && <CircularProgress size={20} />}
                    {...props}
                    onClick={(e) => {
                        inputRef.current?.click();
                        props.onClick && props.onClick(e);
                    }}
                >
                    <FilePresentRoundedIcon fontSize={'medium'} />
                    &nbsp;{content}
                </Button>
            </Tooltip>
        </>
    );
}
