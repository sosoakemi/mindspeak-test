export interface Reference {
  id: string
  title: string
  authors: string
  year: string
  url: string
}

export const referencesData: Reference[] = [
  {
    id: '1',
    title: 'Brain-Computer Interfaces: A Review',
    authors: 'Lotte et al.',
    year: '2018',
    url: 'https://hal.science/hal-01844962'
  },
  {
    id: '2',
    title: 'NeuroSky eSense Meters',
    authors: 'NeuroSky',
    year: '2015',
    url: 'https://developer.neurosky.com/'
  },
  {
    id: '3',
    title: 'Survey on EEG-Based BCIs',
    authors: 'Abiri et al.',
    year: '2019',
    url: 'https://doi.org/10.1016/j.neucom.2018.12.014'
  },
  {
    id: '4',
    title: 'Low-Cost EEG-Based BCI',
    authors: 'Kumar & Bhuvaneswari',
    year: '2020',
    url: 'https://doi.org/10.1007/978-981-15-1816-4_37'
  },
  {
    id: '5',
    title: 'SVM Classification of EEG Signals',
    authors: 'Garrett et al.',
    year: '2003',
    url: 'https://ieeexplore.ieee.org/document/1261314'
  },
  {
    id: '6',
    title: 'AAC: Communication Disorders',
    authors: 'Beukelman & Mirenda',
    year: '2013',
    url: 'https://www.brookespublishing.com/product/augmentative-and-alternative-communication/'
  },
  {
    id: '7',
    title: 'Edge Impulse MLOps',
    authors: 'Hymel et al.',
    year: '2023',
    url: 'https://edgeimpulse.com/'
  },
  {
    id: '8',
    title: 'ESP32 Technical Reference',
    authors: 'Espressif',
    year: '2024',
    url: 'https://www.espressif.com/documentation/esp32_technical_reference_manual_en.pdf'
  },
  {
    id: '9',
    title: 'FastAPI Documentation',
    authors: 'Ramirez',
    year: '2024',
    url: 'https://fastapi.tiangolo.com/'
  }
]
