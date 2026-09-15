export interface ComponentItem {
  id: string
  name: string
  price: number
  category: string
  image: string
}

// Lista de hardware alinhada com a arquitetura atual (PC lê o TGAM direto por
// serial; a fala sai no iPad via Web Speech API). Os itens do plano antigo
// com ESP32/DFPlayer/SD/protoboard/eletrodos descartáveis foram retirados —
// ver seção 2 do CLAUDE.md. Centralizado aqui pra /produto e a Home usarem o
// mesmo custo, em vez de números fixos divergentes em cada lugar.
export const componentsList: ComponentItem[] = [
  {
    id: 'tgam',
    name: 'Sensor TGAM (EEG)',
    price: 120.0,
    category: 'Processamento BCI',
    image: '/images/Sensor%20TGAM%20(NeuroSky).png',
  },
  {
    id: 'speaker',
    name: 'Alto-falante 3W',
    price: 8.0,
    category: 'Saída de Som',
    image: '/images/Alto-falante%203W.png',
  },
  {
    id: 'lipo',
    name: 'Bateria LiPo 3.7V',
    price: 32.0,
    category: 'Alimentação',
    image: '/images/Bateria%20LiPo%203.7V%202000mAh.png',
  },
  {
    id: 'jumpers',
    name: 'Cabos Jumper M/F',
    price: 11.0,
    category: 'Conexões',
    image: '/images/Cabos%20e%20conectores.png',
  },
  {
    id: 'band',
    name: 'Faixa Elástica Ajustável',
    price: 19.0,
    category: 'Estrutura',
    image: '/images/headband%20para%20sensor.png',
  },
  {
    id: 'case',
    name: 'Case Impresso 3D',
    price: 22.0,
    category: 'Proteção',
    image: '/images/Case%20impressa%20em%203D.png',
  },
]

// Custo total calculado a partir da lista acima — nunca chumbado, pra não
// ficar desatualizado se um item for adicionado/removido depois.
export const totalComponentsCost = componentsList.reduce(
  (sum, item) => sum + item.price,
  0
)
export const formattedTotalCost = totalComponentsCost.toFixed(2).replace('.', ',')
