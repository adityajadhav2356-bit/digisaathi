import { ref, onValue, update } from 'firebase/database';
import { db } from '../config/firebase';

export const startRemoteListener = (seniorId, navigate, setSOSVisible) => {
  if (!db || !seniorId) return () => {};

  const commandsRef = ref(db, `/remote_commands/${seniorId}`);
  
  const unsubscribe = onValue(commandsRef, (snapshot) => {
    if (snapshot.exists()) {
      const command = snapshot.val();
      
      // Only process pending commands received in the last 30 seconds
      if (command.status === 'pending' && (Date.now() - command.receivedAt) < 30000) {
        
        // 1. Immediately mark as processing
        update(commandsRef, { status: 'processing' });
        
        // 2. Route based on type
        switch (command.type) {
          case 'sos':
            setSOSVisible(true, command);
            break;
          case 'society':
            navigate(`/society?optionIndex=${command.optionIndex}&fromRemote=true`);
            break;
          case 'needs':
            navigate(`/needs?optionIndex=${command.optionIndex}&fromRemote=true`);
            break;
          default:
            console.warn('Unknown remote command type:', command.type);
        }
        
        // 3. Mark completed
        update(commandsRef, { status: 'completed' });
      }
    }
  });

  return unsubscribe;
};
