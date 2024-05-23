export const cloudfrontUrl = 'https://d28fylukvva3rw.cloudfront.net'

const buildImgUrls = (files) => files.map(file => `${cloudfrontUrl}/${file}`)

const imageFiles = {
    landing: {
        background: 'Untitled_design_13_j4bsrk.png',
        title: 'Trouvaille_700_300_px_vly6tj.png',
        section1: 'coloradovibes_hrvest.jpg',
        section2: 'pexels-min-an-1375560_rxfhwd.jpg',
    },
    home: {
        header: [
            'pexels-jess-loiterton-5505397_bfslhi.jpg',
            'pexels-faruk-tokluoğlu-20081241_nqaywh.jpg',
            'pexels-piotr-arnoldes-6441050_phq1jt.jpg',
            'pexels-toa-heftiba-s%CC%A7inca-1194399_kmhpxc.jpg',
            'pexels-niklas-jeromin-14760650_gmzebk.jpg',
            'pexels-toa-heftiba-s%CC%A7inca-1194406_xybfa5.jpg',
            'pexels-jess-loiterton-5232303_hh9sin.jpg',
            'pexels-maria-orlova-4947223_gmsewn.jpg'
        ],
    },
    login: {
        logo: 'Trouvaille_1_rxks06.png',
        background: 'pexels-maria-orlova-4946983_ilfyqf.jpg',
    },
    register: {
        logo: 'Trouvaille_1_rxks06.png',
        background: 'pexels-edgar-rodrigo-17011415_bicix9.jpg',
        defaultProfile: 'Screen_Shot_2022-09-19_at_2_ey3w9e.png',
        defaultCover: 'pexels-krivec-ales-547119_xsvwvy.jpg',
    },
    trips: {
        header: 'pexels-feelalivenow-9309828_rz3qph.jpg',
    },
    trip: {
        defaultExperience: 'pexels-min-an-1098872_rpk0hi.jpg',
    },
    travelers: {
        header: [
            'pexels-jess-loiterton-8651388_oco8ph.jpg',
            'pexels-maria-orlova-4947416_vevnx1.jpg',
            'pexels-taryn-elliott-3889827_hjqo4j.jpg',
            'DSC04063_3_u0mque.jpg',
            `DSC_1139_sng0vl.jpg`
        ],
    },
    destinations: {
        background: 'pexels-maria-orlova-4947223_gmsewn.jpg',
        header: [
            'Screen_Shot_2023-01-07_at_5.23.32_PM_jmrgam.png',
            'Screen_Shot_2023-01-07_at_5.23.45_PM_thhvgd.png',
            'Screen_Shot_2023-01-07_at_5.23.58_PM_bfyxex.png',
            'Screen_Shot_2023-01-07_at_5.24.10_PM_zqnryr.png',
            'Screen_Shot_2023-01-07_at_5.24.23_PM_jjdjsm.png',
            'Screen_Shot_2023-01-07_at_5.24.38_PM_hcncov.png'
        ],
    },
    experiences: {
        header: [
            'pexels-toa-heftiba-s%CC%A7inca-1194406_xybfa5.jpg',
            'pexels-toa-heftiba-s%CC%A7inca-1194420_llftxi.jpg'
        ],
    },
    tripForm: {
        background: 'image_5_mb8b2r.png',
        defaultCover: 'pexels-marina-leonova-7634434_mnw6wt.jpg',
        defaultExperience: 'pexels-marina-leonova-7634433_klpewl.jpg',
    },
    myTrips: {
        header: 'pexels-roman-odintsov-4553618_fbttpw.jpg',
    },
    global: {
        logo: 'Trouvaille_1_rxks06.png',
        logoDark: 'image_2_bqurbu.png',
    },
}

export const staticImages = (page, subSection) => {
    const data = imageFiles[page][subSection]
    return data instanceof Array ? buildImgUrls(data) : `${cloudfrontUrl}/${data}`
}