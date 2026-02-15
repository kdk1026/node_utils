const ExceptionMessage = {
    isNullOrEmpty: (paramName) => {
        return `${paramName} is null or empty`;
    },

    isNegative: (paramName) => {
        return `${paramName} is negative`;
    }
};

class PagingUtil {
    constructor(pagePerRow, pagePerScreen, totalCnt, currentPage, linkUrl) {
        if (pagePerRow <= 0) {
            throw new Error(ExceptionMessage.isNegative("pagePerRow"));
        }

        if (pagePerScreen <= 0) {
            throw new Error(ExceptionMessage.isNegative("pagePerScreen"));
        }

        if (totalCnt < 0) {
            throw new Error(ExceptionMessage.isNegative("totalCnt"));
        }

        if ( typeof currentPage !== 'string' || !currentPage?.trim() ) {
            throw new Error(ExceptionMessage.isNullOrEmpty("currentPage"));
        }

        const currPageNum = Number.parseInt(currentPage, 10);
        if (Number.isNaN(currPageNum)) throw new Error("currentPage must be a number");

        this.pagePerRow = pagePerRow;
        this.pagePerScreen = pagePerScreen;
        this.totalCnt = totalCnt;
        this.linkUrl = linkUrl;
        this.currentPage = currPageNum;

        this.pagingProcess();
    }

    pagingProcess() {
        this.totalPage = Math.ceil(this.totalCnt / this.pagePerRow);
        if (this.totalPage === 0) this.totalPage = 1;

        this.currentPage = Math.max(1, Math.min(this.currentPage, this.totalPage));

        const currentBlock = Math.floor((this.currentPage - 1) / this.pagePerScreen);
        this.firstPage = (currentBlock * this.pagePerScreen) + 1;
        this.lastPage = Math.min(this.firstPage + this.pagePerScreen - 1, this.totalPage);

        this.prevBlockPage = this.firstPage > 1 ? this.firstPage - 1 : 1;
        this.nextBlockPage = this.lastPage < this.totalPage ? this.lastPage + 1 : this.totalPage;

        this.offSet = (this.currentPage - 1) * this.pagePerRow;

        this.start = this.offSet + 1;
        this.end = Math.min(this.currentPage * this.pagePerRow, this.totalCnt);

        this.totalBlock = Math.ceil(this.totalPage / this.pagePerScreen);
    }
}

export default PagingUtil;