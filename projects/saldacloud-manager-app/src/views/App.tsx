import React from 'react';
import {
  ContextView,
  Box,
  Link,
  Icon,
  Inline,
} from '@stripe/ui-extension-sdk/ui';

const App = () => {
  return (
    <ContextView 
      title="SaldaCloud Manager"
      brandColor="#635bff" 
    >
       <Box css={{ 
         padding: 'large', 
         display: 'grid', 
         gapY: 'medium',
         backgroundColor: 'surface',
         borderRadius: 'medium'
       }}>
          <Inline css={{ alignY: 'center', gapX: 'small' }}>
             <Icon name="rocket" size="medium" css={{ fill: 'success' }} />
             <Box font="heading">Fábrica em Operação</Box>
          </Inline>
          
          <Box font="body" css={{ color: 'secondary' }}>
            Neste momento, 7 agentes **MiMo-v2-Flash** estão processando suas automações de vendas e geração de e-books em tempo real.
          </Box>

          <Box paddingY="small">
             <Inline css={{ gapX: 'xsmall', alignY: 'center' }}>
                <Icon name="checkCircle" size="xsmall" css={{ fill: 'success' }} />
                <Box font="caption">Conectado ao Vercel Cloud</Box>
             </Inline>
          </Box>

          <Box paddingY="medium" borderTopWidth={1} borderTopStyle="solid" borderColor="neutral">
            <Link 
              href="https://saldaclaw-viz.vercel.app/api" 
              target="_blank" 
              external
            >
               Visualizar Monitor Completo (Vercel)
            </Link>
          </Box>

          <Box font="caption" css={{ color: 'disabled', textAlign: 'center' }}>
             v1.1.11 • SaldaCloud Enterprise
          </Box>
       </Box>
    </ContextView>
  );
};

export default App;
