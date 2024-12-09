 
import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { db } from '../firebase';  
import { doc, setDoc } from 'firebase/firestore';

const TiptapEditor = () => {
  const [content, setContent] = useState('');

   const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! Start editing...</p>',
    onUpdate: async ({ editor }) => {
      const html = editor.getHTML();
      setContent(html); 
      await saveToFirebase(html);  
    },
  });

   
  const saveToFirebase = async (html) => {
    try {
      const docRef = doc(db, 'vite', 'content');
      await setDoc(docRef, { html });
      console.log('Content saved to Firebase');
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    }
  };

 
  React.useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return (
    <div>
      <h1>Tiptap Editor</h1>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
          minHeight: '200px',
        }}
      >
   
        <EditorContent editor={editor} />
      </div>
      <h2>Output (HTML):</h2>
      <div
        style={{
          background: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default TiptapEditor;
